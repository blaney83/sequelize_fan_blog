
module.exports = function (sequelize, DataTypes) {
    //lowercase sequelize is the connection 
    let theory_table = sequelize.define("theory_table", {
        media_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
                //    add unique value function
            }
        },
        theory: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1, 160]
        },
        likes: {
            type: DataTypes.STRING,
            defaultValue: 0,
            validate: {
                isNumeric: true
            }
        },
        date_posted: {

            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW(),
        },
        author_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        }
        // createdAt: DataTypes.DATE,
        // updatedAt: DataTypes.DATE,
        // timestamps: false,
    })

    theory_table.associate = function (dbModelsBurrito) {
        theory_table.belongsTo(dbModelsBurrito.author_table, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    theory_table.associate = function(dbModelsBurrito) {
        theory_table.hasMany(dbModelsBurrito.comment_table, {
            onDelete: {
                allowNull: "cascade"
            }
        })
    }

    return theory_table;
}






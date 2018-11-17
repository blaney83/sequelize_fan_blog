module.exports = function(sequelize, DataTypes) {
    //lowercase sequelize is the connection 
    let author_table = sequelize.define("author_table", {
        creator: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
                //    add unique value function
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5,20]
            }
        }
    });

    author_table.associate = function(models) {
        author_table.hasMany(models.theory_table, {
                onDelete: "cascade"
        })
    }
    return author_table;
}

module.exports = function (sequelize, DataTypes) {
    //lowercase sequelize is the connection 
    let comment_table = sequelize.define("comment_table", {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1, 160]
        },
        date_posted: DataTypes.DATE,
    })

    comment_table.associate = function (dbModelsBurrito) {
        comment_table.belongsTo(dbModelsBurrito.theory_table, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return comment_table;
}
const { Model, DataTypes, Sequelize} = require('sequelize');

const FOLLOW_TABLE = 'list_follow_users'

class ListFollowUsers extends Model {

    static config(sequelize) {
        return {
            sequelize,
            tableName: FOLLOW_TABLE,
            modelName: 'ListFollowUsers',
            timestamps: false
        };
    }

}

const ListFollowUsersSchema = {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    id_user_follow: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
};

module.exports = { ListFollowUsers, ListFollowUsersSchema };
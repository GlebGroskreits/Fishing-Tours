const sequelize = require("../db")
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    role: {type: DataTypes.STRING(20), defaultValue: "client", allowNull: true},
    email: {type: DataTypes.STRING(45), unique: true, allowNull: true},
    password: {type: DataTypes.STRING, allowNull: true},
}, {
    timestamps: false
});

const Guide = sequelize.define('guide', {
    id_guide: {type: DataTypes.INTEGER, primaryKey: true, references: { model: User, key: 'id' }},
    seniority: {type: DataTypes.INTEGER, allowNull: true},
    description: {type: DataTypes.STRING, allowNull: true},
    image: {type: DataTypes.STRING, allowNull: true},
}, {
    timestamps: false
});

const User_Personal = sequelize.define('user_personal', {
    id_user: {type: DataTypes.INTEGER, primaryKey: true, references: { model: User, key: 'id' }},
    name: {type: DataTypes.STRING(20), allowNull: true},
    surname: {type: DataTypes.STRING(20), allowNull: true},
    patronymic: {type: DataTypes.STRING(20)},
    birthday: {type: DataTypes.DATE, allowNull: true},
    telephone: {type: DataTypes.STRING, allowNull: true},
}, {
    timestamps: false
});

const Refresh_Token = sequelize.define('refresh_token', {
    id_user: {type: DataTypes.INTEGER, primaryKey: true, references: { model: User, key: 'id' }},
    refresh_token: {type: DataTypes.STRING, allowNull: true},
}, {
    timestamps: false
});

const Tour = sequelize.define('tour', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING(10), defaultValue:"common", allowNull: true},
    name: {type: DataTypes.STRING(25), allowNull: true},
    image: {type: DataTypes.STRING, allowNull: true},
    duration: {type: DataTypes.INTEGER, allowNull: true},
    description: {type: DataTypes.STRING, allowNull: true},
    cost_people: {type: DataTypes.NUMERIC(4, 2), defaultValue:50, allowNull: true},
}, {
    timestamps: false
});

const Tour_Gallery = sequelize.define('tour_gallery', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_tour: {type: DataTypes.INTEGER, primaryKey: true, references: { model: Tour, key: 'id' }},
    image: {type: DataTypes.STRING, allowNull: true},
}, {
    timestamps: false
});

const Tour_Day = sequelize.define('tour_day', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_tour: {type: DataTypes.INTEGER, primaryKey: true, references: { model: Tour, key: 'id' }},
    name: {type: DataTypes.STRING(40), allowNull: true},
    image: {type: DataTypes.STRING, allowNull: true},
    description: {type: DataTypes.STRING, allowNull: true},
    address: {type: DataTypes.STRING, allowNull: true},
}, {
    timestamps: false
});

const Tour_Active = sequelize.define('tour_active', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_tour: {type: DataTypes.INTEGER, references: { model: Tour, key: 'id' }},
    id_guide: {type: DataTypes.INTEGER, references: { model: Guide, key: 'id_guide' }},
    date_start: {type: DataTypes.DATE, allowNull: true},
    status: {type: DataTypes.STRING, allowNull: true},
}, {    
    timestamps: false
});

const Request = sequelize.define('request', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_client: {type: DataTypes.INTEGER, references: { model: User, key: 'id' }},
    id_tour: {type: DataTypes.INTEGER, references: { model: Tour_Active, key: 'id' }},
}, {
    timestamps: false
});

const Review = sequelize.define('review', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id_client: {type: DataTypes.INTEGER, references: { model: User, key: 'id' }},
    id_tour: {type: DataTypes.INTEGER, references: { model: Tour, key: 'id' }},
    raiting: {type: DataTypes.INTEGER, allowNull: true},
    description: {type: DataTypes.STRING, allowNull: true},
}, {
    timestamps: false
});

User.hasOne(User_Personal, {foreignKey: 'id_user',sourceKey: 'id', as:'user_personal'});
User_Personal.belongsTo(User, { foreignKey: 'id_user',targetKey: 'id', as:'user'});

User.hasOne(Refresh_Token, {foreignKey: 'id_user',sourceKey: 'id', as: 'refresh_token'});
Refresh_Token.belongsTo(User, { foreignKey: 'id_user',targetKey: 'id', as: 'user'});

User.hasOne(Guide, {foreignKey: 'id_guide',sourceKey: 'id', as: 'guide'});
Guide.belongsTo(User, { foreignKey: 'id_guide',targetKey: 'id', as: 'user'});

User.hasMany(Review, {foreignKey: 'id_client',sourceKey: 'id', as: 'review'});
Review.belongsTo(User, { foreignKey: 'id_client',targetKey: 'id', as: 'user'});

User.hasMany(Request, {foreignKey: 'id_client',sourceKey: 'id', as: 'request'});
Request.belongsTo(User, { foreignKey: 'id_client',targetKey: 'id', as: 'user'});


Tour_Active.hasMany(Request, {foreignKey: 'id_tour',sourceKey: 'id', as: 'request'});
Request.belongsTo(Tour_Active, { foreignKey: 'id_tour',targetKey: 'id', as: 'tour'});

Guide.hasMany(Tour_Active, {foreignKey: 'id_guide',sourceKey: 'id_guide', as: 'tour_active'});
Tour_Active.belongsTo(Guide, { foreignKey: 'id_guide',targetKey: 'id_guide', as: 'guide'});


Tour.hasMany(Tour_Active, {foreignKey: 'id_tour',sourceKey: 'id', as: 'tour_active'});
Tour_Active.belongsTo(Tour, { foreignKey: 'id_tour',targetKey: 'id', as: 'tour'});

Tour.hasMany(Review, {foreignKey: 'id_tour',sourceKey: 'id', as: 'review'});
Review.belongsTo(Tour, { foreignKey: 'id_tour',targetKey: 'id', as: 'tour'});

Tour.hasMany(Tour_Day, {foreignKey: 'id_tour',sourceKey: 'id', as: 'tour_day'});
Tour_Day.belongsTo(Tour, { foreignKey: 'id_tour',targetKey: 'id', as: 'tour'});

Tour.hasMany(Tour_Gallery, {foreignKey: 'id_tour',sourceKey: 'id', as: 'tour_gallery'});
Tour_Gallery.belongsTo(Tour, { foreignKey: 'id_tour',targetKey: 'id', as: 'tour'});

module.exports = {
    User,
    Guide,
    Refresh_Token,
    User_Personal,
    Tour,
    Tour_Active,
    Tour_Day,
    Tour_Gallery,
    Review,
    Request
} 
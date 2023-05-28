import { DataTypes } from 'sequelize';
import database from './database.js';

export default async function migrate() {
  await database.sync();

  await database.queryInterface.createTable('submited_clinics', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    horario_aberto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    horario_fechado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  await database.queryInterface.createTable('clinic_addresses', {
    CEP: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      allowNull: false,
      primaryKey: true,
    },
    rua: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SubmitedClinicID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'submited_clinics',
        key: 'id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  await database.queryInterface.addConstraint('clinic_addresses', {
    fields: ['SubmitedClinicID'],
    type: 'foreign key',
    name: 'SubmitedClinicsID',
    references: {
      table: 'submited_clinics',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
}

migrate();
import { DataTypes, Model } from 'sequelize';
import database from '../database/database.js';

class SubmitedClinics extends Model {}

SubmitedClinics.init({
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
    city : { 
        type: DataTypes.STRING,
        allowNull: false
    }}, 

    {
        sequelize: database,
        modelName: 'submited_clinics'
    }
)

async function create(submitedClinic) {
    try {
      const createdSubmitedClinic = await SubmitedClinics.create(submitedClinic);
      return read(createdSubmitedClinic.id);
    } catch (error) {
      console.error('Error creating submited clinic:', error);
      throw error;
    }
  }
  
async function read(id) {
    try {
        const submitedClinic = await SubmitedClinics.findByPk(id);
        return submitedClinic;
    } catch (error) {
        console.error('Error retrieving submited clinic:', error);
        throw error;
    }
}

async function readAll() {
    try {
      const submitedClinics = await SubmitedClinics.findAll();
      return submitedClinics;
    } catch (error) {
      console.error('Não foi possível achar as clínicas ;(', error);
      throw error;
    }
}

async function update(submitedClinic, id) {
    try {
        const [, updatedSubmitedClinics] = await SubmitedClinic.update(submitedClinic, {
            where: { id },
            returning: true,
        });

        if (updatedSubmitedClinics.length === 1) {
            return read(id);
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error updating submited clinic:', error);
        throw error;
    }
}

async function remove(id) {
    try {
        const deletedCount = await SubmitedClinics.destroy({
            where: { id },
        });

        return deletedCount === 1;
    } catch (error) {
        console.error('Error deleting submited clinic:', error);
        throw error;
    }
}

export default { SubmitedClinics, readAll, create, read, update, remove };
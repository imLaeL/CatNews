import { DataTypes, Model } from 'sequelize';
import database from '../database/database.js';
import SubmitedClinics from './submited_clinics.js';

class Address extends Model { }

Address.init(
    {
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
              model: 'SubmitedClinics',
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
    },
    {
        sequelize: database,
        modelName: 'clinic_addresses',
    }
);


async function create(address) {
    try {
        const createdAddress = await Address.create(address);
        return read(createdAddress.CEP);
    } catch (error) {
        console.error('Não foi possível criar o endereço:', error);
        throw error;
    }
}


async function read(CEP) {
    try {
        const address = await Address.findByPk(CEP, { include: SubmitedClinics });
        return address;
    } catch (error) {
        console.error('Erro ao ler o endereço:', error);
        throw error;
    }
}

async function readAll() {
    try {
        const addresses = await Address.findAll({ include: SubmitedClinics });
        return addresses;
    } catch (error) {
        console.error('Erro ao ler todos os endereços:', error);
        throw error;
    }
}

async function update(CEP, newData) {
    try {
      await Endereco.update(newData, { where: { CEP } });
      return read(CEP);
    } catch (error) {
      console.error('Erro ao atualizar o endereço:', error);
      throw error;
    }
}

async function remove(CEP) {
    try {
        const deletedCount = await Address.destroy({
            where: { CEP },
        });
        return deletedCount === 1;
    } catch (error) {
        console.error('Erro ao remover o endereço:', error);
        throw error;
    }
}

export { Address as default, create, read, readAll, update, remove };
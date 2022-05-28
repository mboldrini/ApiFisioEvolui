import { EntityRepository, Repository } from 'typeorm';
import ServicesTypes from '../entities/ServicesTypes';

@EntityRepository(ServicesTypes)
export class ServicesTypesRepository extends Repository<ServicesTypes> {}
export default ServicesTypesRepository;

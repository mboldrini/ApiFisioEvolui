import { EntityRepository, Repository } from 'typeorm';
import ServicesTypes from '../entities/ServicesTypes';

interface IProps {
	user_id: number;
	client_id: number;
	start_date?: Date;
}

@EntityRepository(ServicesTypes)
export class ServicesTypesRepository extends Repository<ServicesTypes> {}
export default ServicesTypesRepository;

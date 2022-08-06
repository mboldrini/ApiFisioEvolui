import { Between, EntityRepository, In, MoreThanOrEqual, Repository } from 'typeorm';
import Appointments from '../entities/Appointments';

interface IParams {
	start_day: Date;
	end_day: Date;
	user_id: number;
}

@EntityRepository(Appointments)
export class AppointmentsRepository extends Repository<Appointments> {}
export default AppointmentsRepository;

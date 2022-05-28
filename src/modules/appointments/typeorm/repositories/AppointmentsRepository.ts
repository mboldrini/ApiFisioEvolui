import { EntityRepository, Repository } from 'typeorm';
import Appointments from '../entities/Appointments';

@EntityRepository(Appointments)
export class AppointmentsRepository extends Repository<Appointments> {}
export default AppointmentsRepository;

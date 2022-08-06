import { Between, EntityRepository, In, MoreThanOrEqual, Repository } from 'typeorm';
import Appointments from '../entities/Appointments';

interface IParams {
	start_month: Date;
	end_month: Date;
}

@EntityRepository(Appointments)
export class AppointmentsRepository extends Repository<Appointments> {
	public async findByMonth({ start_month, end_month }: IParams): Promise<Appointments[] | undefined> {
		const user = await this.find({
			where: {
				date_scheduled: Between(start_month, end_month),
				scheduled: true,
			},
			order: {
				['date_scheduled']: 'ASC',
				['start_hour']: 'ASC',
			},
		});
		return user;
	}
}
export default AppointmentsRepository;

import { Between, EntityRepository, In, MoreThanOrEqual, Repository } from 'typeorm';
import Appointments from '../entities/Appointments';

interface IProps {
	user_id: number;
	client_id: number;
	start_date?: Date;
	end_date?: Date;
}

@EntityRepository(Appointments)
export class AppointmentsRepository extends Repository<Appointments> {
	public async findOrderBy({ user_id, client_id, start_date, end_date }: IProps): Promise<any | undefined> {
		const diagnostic = await this.find({
			where: {
				client_id,
				user_id,
				date_scheduled: Between(start_date, end_date),
			},
			order: {
				date_scheduled: 'ASC',
				start_hour: 'ASC',
			},
		});

		return diagnostic;
	}
	public async findAllMonth({ user_id, client_id, start_date, end_date }: IProps): Promise<any | undefined> {
		const diagnostic = await this.find({
			where: {
				client_id,
				user_id,
				date_scheduled: Between(start_date, end_date),
				scheduled: true,
			},
			order: {
				date_scheduled: 'ASC',
				start_hour: 'ASC',
			},
		});

		return diagnostic;
	}
}
export default AppointmentsRepository;

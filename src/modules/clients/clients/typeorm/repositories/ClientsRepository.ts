import { EntityRepository, Like, Repository } from 'typeorm';
import Clients from '../entities/Clients';

interface IFindByName {
	user_id: number;
	nome: string;
	cpf?: string;
}
interface IFindByDocument {
	user_id: number;
	cpf: string;
}
interface IFindByEmail {
	user_id: number;
	email: string;
}
interface IFindByTelefone {
	user_id: number;
	celphone: string;
}
interface IFindByAddress {
	user_id: number;
	address: string;
}
interface IFindByServiceType {
	user_id: number;
	serviceType_id: number;
}

@EntityRepository(Clients)
export class ClientsRepository extends Repository<Clients> {
	public async findByName({ user_id, nome }: IFindByName): Promise<Clients[] | undefined> {
		const payment = await this.find({
			where: {
				name: Like(`%${nome}%`),
				user_id: user_id,
				enabled: true,
			},
		});
		return payment;
	}
	public async findByCPF({ user_id, cpf }: IFindByDocument): Promise<Clients[] | undefined> {
		const payment = await this.find({
			where: {
				document: Like(`%${cpf}%`),
				user_id: user_id,
				enabled: true,
			},
		});
		return payment;
	}
	public async findByEmail({ user_id, email }: IFindByEmail): Promise<Clients[] | undefined> {
		const payment = await this.find({
			where: {
				email: Like(`%${email}%`),
				user_id: user_id,
				enabled: true,
			},
		});
		return payment;
	}
	public async findByTelefone({ user_id, celphone }: IFindByTelefone): Promise<Clients[] | undefined> {
		const payment = await this.find({
			where: {
				celphone: Like(`%${celphone}%`),
				user_id: user_id,
				enabled: true,
			},
		});
		return payment;
	}
	public async findByAddress({ user_id, address }: IFindByAddress): Promise<Clients[] | undefined> {
		const payment = await this.find({
			where: {
				address: Like(`%${address}%`),
				user_id: user_id,
				enabled: true,
			},
		});
		return payment;
	}
	public async findByServiceType({ user_id, serviceType_id }: IFindByServiceType): Promise<Clients[] | undefined> {
		const payment = await this.find({
			where: {
				serviceType_id: serviceType_id,
				user_id: user_id,
				enabled: true,
			},
		});
		return payment;
	}
}
export default ClientsRepository;

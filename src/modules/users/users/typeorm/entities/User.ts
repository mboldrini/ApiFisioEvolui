import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
class User {
	@PrimaryGeneratedColumn('uuid')
	user_id: number;

	@Column()
	user_code: string;

	@Column()
	name: string;

	@Column()
	family_name: string;

	@Column()
	given_name: string;

	@Column()
	picture: string;

	@Column()
	email: string;

	@Column()
	enabled: number;

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date;
}
export default User;

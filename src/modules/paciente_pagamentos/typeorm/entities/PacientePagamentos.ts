import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('paciente_pagamentos')
class PacientePagamentos {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	id_paciente: number;

	@Column()
	id_evolucao: number;

	@Column()
	id_user: string;

	@Column()
	status: number;

	@Column()
	valor: number;

	@Column()
	observacoes: string;

	@Column()
	excluido?: boolean;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
export default PacientePagamentos;

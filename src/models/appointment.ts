import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,
  UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './user';

@Entity('appointments') // Esse decorator recebe a classe desse Model, não precisamos do constructor.
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(()=> User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // A função Omit<Classe com os tipo, variavel a ser omitida como parametro>
  // Omitimos o id porque queremos cria-lo com a lib uuidv4
  //
  // constructor({ provider, date }: Omit<Appointment,'id'>) {
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default Appointment;

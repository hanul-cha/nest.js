import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(AuthCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = AuthCredentialDto;

    const salt = await bcypt.genSalt();
    const hashedPassword = await bcypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

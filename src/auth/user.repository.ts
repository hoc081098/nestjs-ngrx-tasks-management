import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp({ password, username }: AuthCredentialDto): Promise<void> {
    const user = new User();
    user.username = username;
    user.password = password;

    await user.save();
  }
}

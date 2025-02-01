import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../components/health-tracker/user.model';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new user', () => {
    const user: User = { name: 'Alice', activity: ['Cycling'], duration: 25 };
    service.addUser(user);
    expect(service.getUsers()).toContain(user);
  });

  it('should update user duration if the user and activity exist', () => {
    const user: User = { name: 'Alice', activity: ['Cycling'], duration: 25 };
    service.addUser(user);
    service.updateUserDuration('Alice', 'Cycling', 10);
    expect(service.getUsers()[0].duration).toBe(35);
  });
});
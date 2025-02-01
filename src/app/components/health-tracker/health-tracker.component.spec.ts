import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HealthTrackerComponent } from './health-tracker.component';
import { UserService } from '../../services/user.service';
import { User } from './user.model';

describe('HealthTrackerComponent', () => {
  let component: HealthTrackerComponent;
  let fixture: ComponentFixture<HealthTrackerComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HealthTrackerComponent], // Import the standalone component
      providers: [UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthTrackerComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userList from UserService', () => {
    const mockData: User[] = [{ name: 'Alice', activity: ['Cycling'], duration: 25 }];
    spyOn(userService, 'getUsers').and.returnValue(mockData);
    component.ngOnInit();
    expect(component.userList).toEqual(mockData);
  });

  it('should add a new user if the name does not exist', () => {
    component.userObj = { name: 'Bob', activity: [], duration: 30 };
    component.selectedActivity = 'Running';
    component.createNewUser();
    expect(userService.getUsers().length).toBe(1);
    expect(userService.getUsers()[0].name).toBe('Bob');
  });

  it('should update duration if the user and activity exist', () => {
    const user: User = { name: 'Alice', activity: ['Cycling'], duration: 25 };
    userService.addUser(user);
    component.userObj = { name: 'Alice', activity: [], duration: 10 };
    component.selectedActivity = 'Cycling';
    component.createNewUser();
    expect(userService.getUsers()[0].duration).toBe(35);
  });

  it('should validate name, activity, and duration', () => {
    component.userObj = { name: 'A', activity: [], duration: 0 };
    component.selectedActivity = '';
    component.createNewUser();
  
    expect(component.nameError).toBe('Name must have at least 3 characters.');
    expect(component.activityError).toBe('Please select an activity.');
    expect(component.durationError).toBe('Duration must be greater than zero.');
  });
});
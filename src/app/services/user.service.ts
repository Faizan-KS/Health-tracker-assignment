// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { User } from '../components/health-tracker/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];

  constructor() {}

  // Add a new user
  addUser(user: User): void {
    this.users.push(user);
  }

  // Get all users
  getUsers(): User[] {
    return this.users;
  }

  // Update user duration if the user and activity exist
  updateUserDuration(name: string, activity: string, duration: number): void {
    const user = this.users.find((u) => u.name === name);
    if (user) {
      const activityIndex = user.activity.indexOf(activity);
      if (activityIndex !== -1) {
        user.duration += duration;
      }
    }
  }
}
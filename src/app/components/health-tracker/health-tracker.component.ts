import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from './user.model';

@Component({
  selector: 'app-health-tracker',
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './health-tracker.component.html',
  styleUrl: './health-tracker.component.css',
})
export class HealthTrackerComponent {
  ngOnInit() {
    throw new Error('Method not implemented.');
  }
  userObj: User;
  userList: User[] = [];
  activityList: string[] = ['Cycling', 'Running', 'Swimming', 'Yoga', 'Lifting'];
  exampleList: any[] = [
    { name: 'Example', activity: 'Swimming, Cycling', no: '2', duration: '30' },
    { name: 'Example', activity: 'Running, Cycling', no: '2', duration: '60' },
    { name: 'Example', activity: 'Yoga, Lifting', no: '2', duration: '40' },
  ];
  selectedActivity: string = '';
  searchName = '';
  searchActivity = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  // Error messages
  nameError: string = '';
  activityError: string = '';
  durationError: string = '';

  constructor() {
    this.userObj = new User();
    const localData = localStorage.getItem('healthTracker');
    if (localData != null) {
      this.userList = JSON.parse(localData);
    }
  }


  createNewUser() {
    // Reset error messages
    this.nameError = '';
    this.activityError = '';
    this.durationError = '';

    // Validate name
    if (this.userObj.name.length < 3) {
      this.nameError = 'Name must have at least 3 characters.';
      return;
    }

    // Validate activity
    if (!this.selectedActivity) {
      this.activityError = 'Please select an activity.';
      return;
    }

    // Validate duration
    if (this.userObj.duration <= 0) {
      this.durationError = 'Duration must be greater than zero.';
      return;
    }

    // If all validations pass, proceed to add the user
    const existingUser = this.userList.find(
      (user) => user.name === this.userObj.name
    );

    if (existingUser) {
      const existingActivityIndex = existingUser.activity.findIndex(
        (activity) => activity === this.selectedActivity
      );

      if (existingActivityIndex !== -1) {
        existingUser.duration += this.userObj.duration;
      } else {
        existingUser.activity.push(this.selectedActivity);
        existingUser.duration += this.userObj.duration;
      }
    } else {
      this.userObj.activity.push(this.selectedActivity);
      const user = JSON.stringify(this.userObj);
      const parseUser = JSON.parse(user);
      this.userList.push(parseUser);
    }
    localStorage.setItem('healthTracker', JSON.stringify(this.userList));
    this.userObj = {
      name: '',
      activity: [],
      duration: 0,
    };
    this.selectedActivity = '';
  }

  // Get the total number of pages
  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  // Get data for the current page
  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredData.slice(startIndex, endIndex);
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Go to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Go to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Generate an array of page numbers for navigation
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Combined dataset for pagination
  get combinedData(): any[] {
    return [
      ...this.userList.map((user) => ({
        name: user.name,
        activity: user.activity.join(', '),
        no: user.activity.length,
        duration: user.duration,
      })),
      ...this.exampleList,
    ];
  }

  // Filtered dataset based on search criteria
  get filteredData(): any[] {
    let data = this.combinedData;

    if (this.searchName) {
      data = data.filter((item) =>
        item.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }

    if (this.searchActivity) {
      data = data.filter((item) =>
        item.activity.toLowerCase().includes(this.searchActivity.toLowerCase())
      );
    }

    return data;
  }
}

// export class User {
//   name: string;
//   duration: number;
//   activity: string[];

//   constructor() {
//     this.name = '';
//     this.activity = [];
//     this.duration = 0;
//   }
// }


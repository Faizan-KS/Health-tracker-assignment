// src/app/components/health-tracker/user.model.ts
export class User {
    name: string;
    activity: string[];
    duration: number;
  
    constructor() {
      this.name = '';
      this.activity = [];
      this.duration = 0;
    }
  }
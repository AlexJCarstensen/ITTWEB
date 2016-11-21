import { Exercise } from './exercise';

export class Workout {
    id: number;
    name: string;
    user: string;
    exercises:[Exercise];
}

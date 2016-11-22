import { Exercise } from './exercise';

export class Workout {
    _id: number;
    name: string;
    user: string;
    exercises: Exercise[];
}

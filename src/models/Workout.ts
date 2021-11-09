import { CardioExercise } from './CardioExercise';
import { Exercise } from './Exercise';
import { StrengthExercise } from './StrengthExercise';

export interface Workout {
  id: string;
  workoutName: string;
  workoutType: string;
  exercises: Exercise[];
}

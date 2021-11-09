import { CardioExercise } from './CardioExercise';
import { StrengthExercise } from './StrengthExercise';

export type Exercise = Partial<CardioExercise> & Partial<StrengthExercise>; //todo think of better way

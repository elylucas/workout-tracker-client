<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 bg-light-grey rounded-md shadow-lg"
    >
      <p class="text-at-light-green">{{ statusMsg }}</p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <form
        class="flex flex-col gap-y-5 w-full"
        @submit.prevent="createWorkout"
      >
        <h1 class="text-2xl text-at-light-green">Record Workout</h1>

        <div class="flex flex-col">
          <label for="workout-name" class="mb-1 text-sm text-at-light-green">
            Workout Name
          </label>
          <input
            type="text"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="workout-name"
            v-model="workoutName"
          />
        </div>

        <div class="flex flex-col">
          <label for="workout-type" class="mb-1 text-sm text-at-light-green">
            Workout Type
          </label>
          <select
            id="workout-type"
            class="p-2 text-gray-500 focus:outline-none"
            required
            v-model="workoutType"
            @change="workoutChange"
          >
            <option value="select-workout">Select Workout</option>
            <option value="strength">Strength Training</option>
            <option value="cardio">Cardio</option>
          </select>

          <!-- strength training inputs -->
          <div
            v-if="workoutType === 'strength'"
            class="flex flex-col gap-y-4 mt-4"
          >
            <div
              class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
              v-for="(item, index) in exercises"
              :key="index"
            >
              <div class="flex flex-col md:w1/3">
                <label
                  for="exercise-name"
                  class="mb-1 text-sm text-at-light-green"
                  >Exercise</label
                >
                <input
                  type="text"
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  v-model="item.exercise"
                />
              </div>
              <div class="flex flex-col flex-1">
                <label for="sets" class="mb-1 text-sm text-at-light-green"
                  >Sets</label
                >
                <input
                  type="text"
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  v-model="item.sets"
                />
              </div>
              <div class="flex flex-col flex-1">
                <label for="reps" class="mb-1 text-sm text-at-light-green"
                  >Reps</label
                >
                <input
                  type="text"
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  v-model="item.reps"
                />
              </div>
              <div class="flex flex-col flex-1">
                <label for="weight" class="mb-1 text-sm text-at-light-green"
                  >Weight (lbs)</label
                >
                <input
                  type="text"
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  v-model="item.weight"
                />
              </div>
              <img
                src="@/assets/images/trash-light-green.png"
                alt="delete"
                class="h-4 w-auto absolute -left-5 cursor-pointer"
                @click="deleteExercise(item.id)"
              />
            </div>
            <Button type="button" @click="addExercise">Add</Button>
          </div>

          <!-- cardio inputs -->
          <div
            v-if="workoutType === 'cardio'"
            class="flex flex-col gap-y-4 mt-4"
          >
            <div
              class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
              v-for="(item, index) in exercises"
              :key="index"
            >
              <div class="flex flex-col md:w1/3">
                <label
                  for="cardio-type"
                  class="mb-1 text-sm text-at-light-green"
                  >Type</label
                >
                <select
                  id="cardio-type"
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  v-model="item.cardioType"
                >
                  <option value="#" selected>Select Type</option>
                  <option value="run">Run</option>
                  <option value="walk">Walk</option>
                </select>
              </div>
              <div class="flex flex-col flex-1">
                <label for="distance" class="mb-1 text-sm text-at-light-green"
                  >Distance</label
                >
                <input
                  type="text"
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  v-model="item.distance"
                />
              </div>
              <div class="flex flex-col flex-1">
                <label for="duration" class="mb-1 text-sm text-at-light-green"
                  >Duration</label
                >
                <input
                  type="text"
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  v-model="item.duration"
                />
              </div>
              <div class="flex flex-col flex-1">
                <label for="pace" class="mb-1 text-sm text-at-light-green"
                  >Pace</label
                >
                <input
                  type="text"
                  class="p-2 w-full text-gray-500 focus:outline-none"
                  v-model="item.pace"
                />
              </div>
              <img
                src="@/assets/images/trash-light-green.png"
                alt="delete"
                class="h-4 w-auto absolute -left-5 cursor-pointer"
                @click="deleteExercise(item.id)"
              />
            </div>
            <Button type="button" @click="addExercise">Add</Button>
          </div>
          <Button class="mt-6">Record Workout</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { uid } from 'uid';
import { supabase } from '../supabase/init';
import store from '../store';
import { Exercise } from '@/models/Exercise';
import { User } from '@/models/User';
export default {
  name: 'create',
  setup() {
    // Create data
    const workoutName = ref('');
    const workoutType = ref('select-workout');
    const exercises = ref<Exercise[]>([]);
    const statusMsg = ref<string>();
    const errorMsg = ref<string>();
    const user = computed<User>(() => store.state.user!); //todo why type errors?

    // Add exercise
    const addExercise = () => {
      if (workoutType.value === 'strength') {
        exercises.value.push({
          id: uid(),
          exercise: '',
          sets: '',
          reps: '',
          weight: '',
        });
        return;
      } else {
        exercises.value.push({
          id: uid(),
          cardioType: '#' as any,
          distance: '',
          duration: '',
          pace: '',
        });
      }
    };

    // Delete exercise
    const deleteExercise = (id?: string) => {
      if (exercises.value.length > 1) {
        exercises.value = exercises.value.filter((e) => e.id !== id);
      } else {
        errorMsg.value =
          'Error: Cannot remove, need to have at least one exercise';
        setTimeout(() => (errorMsg.value = ''), 5000);
      }
    };

    // Listens for chaging of workout type input
    const workoutChange = () => {
      exercises.value = [];
      addExercise();
    };

    // Create workout
    const createWorkout = async () => {
      console.log(user.value);
      try {
        const { error } = await supabase.from('workouts').insert([
          {
            workoutName: workoutName.value,
            workoutType: workoutType.value,
            exercises: exercises.value,
            userId: user.value!.id,
          },
        ]);
        if (error) {
          throw error;
        }
        statusMsg.value = 'Success: Workout Created!';
        workoutName.value = '';
        workoutType.value = 'select-workout';
        exercises.value = [];
        setTimeout(() => (statusMsg.value = ''), 5000);
      } catch (e: any) {
        errorMsg.value = e.message;
        setTimeout(() => (errorMsg.value = ''), 5000);
      }
    };

    return {
      workoutName,
      workoutType,
      exercises,
      statusMsg,
      errorMsg,
      addExercise,
      workoutChange,
      deleteExercise,
      createWorkout,
    };
  },
};
</script>

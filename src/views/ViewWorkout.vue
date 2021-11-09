<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- App Msg -->
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 rounded-md shadow-md bg-light-grey"
    >
      <p class="text-at-light-green">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>

    <div v-if="dataLoaded">
      <!-- general workout info -->
      <div
        class="
          flex flex-col
          items-center
          p-8
          rouned-md
          shadow-md
          bg-light-grey
          relative
        "
      >
        <!-- icons -->
        <div v-if="user" class="flex absolute left-2 top-2 gap-x-2">
          <div
            class="
              h-7
              w-7
              rounded-full
              flex
              justify-center
              items-center
              cursor-pointer
              bg-at-light-green
              shadow-lg
            "
            @click="editMode"
          >
            <img
              src="../assets/images/pencil-light.png"
              alt="edit"
              class="h-3.5 w-auto"
            />
          </div>

          <div
            class="
              h-7
              w-7
              rounded-full
              flex
              justify-center
              items-center
              cursor-pointer
              bg-at-light-green
              shadow-lg
            "
            @click="deleteWorkout"
          >
            <img
              src="../assets/images/trash-light.png"
              alt="edit"
              class="h-3.5 w-auto"
            />
          </div>
        </div>

        <img
          src="../assets/images/running-light-green.png"
          alt="running"
          class="h-24 w-auto"
          v-if="data.workoutType === 'cardio'"
        />

        <img
          src="../assets/images/dumbbell-light-green.png"
          alt="running"
          class="h-24 w-auto"
          v-if="data.workoutType === 'strength'"
        />
        <span
          class="
            mt-6
            py-1.5
            px-5
            text-xs text-white
            bg-at-light-green
            rounded-lg
            shadow-md
          "
        >
          {{ data.workoutType }}
        </span>
        <div class="w-full mt-6">
          <input
            type="text"
            class="p-2 w-full text-gray-500 focus:outline-none"
            v-if="edit"
            v-model="data.workoutName"
          />
          <h1 class="text-at-light-green text-2xl text-center" v-else>
            {{ data.workoutName }}
          </h1>
        </div>
      </div>

      <!-- Exercises -->
      <div
        class="
          mt-10
          p-8
          rounded-md
          flex flex-col
          item-center
          bg-light-grey
          shadow-md
        "
      >
        <!-- strength -->
        <div
          class="flex flex-col gap-y-4 w-full"
          v-if="data.workoutType === 'strength'"
        >
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <!-- name -->
            <div class="flex flex-2 flex-col md:width-1/3">
              <label
                for="exercise-name"
                class="mb-1 text-sm text-at-light-green"
              >
                Exercise
              </label>
              <input
                id="exercise-name"
                type="text"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.exercise"
              />
              <p v-else class="">{{ item.exercise }}</p>
            </div>
            <!-- sets -->
            <div class="flex flex-1 flex-col">
              <label for="sets" class="mb-1 text-sm text-at-light-green">
                Sets
              </label>
              <input
                id="sets"
                type="text"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.sets"
              />
              <p v-else class="">{{ item.sets }}</p>
            </div>
            <!-- reps -->
            <div class="flex flex-1 flex-col">
              <label for="reps" class="mb-1 text-sm text-at-light-green">
                Reps
              </label>
              <input
                id="reps"
                type="text"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.reps"
              />
              <p v-else class="">{{ item.reps }}</p>
            </div>
            <!-- weight -->
            <div class="flex flex-1 flex-col">
              <label for="weight" class="mb-1 text-sm text-at-light-green">
                Weight
              </label>
              <input
                id="weight"
                type="text"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.weight"
              />
              <p v-else class="">{{ item.weight }}</p>
            </div>
            <img
              v-if="edit"
              @click="deleteExercise(item.id)"
              src="../assets/images/trash-light-green.png"
              alt="delete"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
            />
          </div>
          <Button v-if="edit" @click="addExercise" type="button">Add</Button>
        </div>

        <!-- cardio -->
        <div
          class="flex flex-col gap-y-4 w-full"
          v-if="data.workoutType === 'cardio'"
        >
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <!-- name -->
            <div class="flex flex-2 flex-col md:width-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-at-light-green">
                Type
              </label>
              <select
                id="cardio-type"
                type="text"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.cardioType"
              >
                <option value="run">Run</option>
                <option value="walk">Walk</option>
              </select>
              <p v-else class="">{{ item.cardioType }}</p>
            </div>
            <!-- distance -->
            <div class="flex flex-1 flex-col">
              <label for="distance" class="mb-1 text-sm text-at-light-green">
                Distance
              </label>
              <input
                id="distance"
                type="text"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.distance"
              />
              <p v-else class="">{{ item.distance }}</p>
            </div>
            <!-- duration -->
            <div class="flex flex-1 flex-col">
              <label for="duration" class="mb-1 text-sm text-at-light-green">
                Duration
              </label>
              <input
                id="duration"
                type="text"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.duration"
              />
              <p v-else class="">{{ item.duration }}</p>
            </div>
            <!-- pace -->
            <div class="flex flex-1 flex-col">
              <label for="pace" class="mb-1 text-sm text-at-light-green">
                Pace
              </label>
              <input
                id="pace"
                type="text"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.pace"
              />
              <p v-else class="">{{ item.pace }}</p>
            </div>
            <img
              v-if="edit"
              @click="deleteExercise(item.id)"
              src="../assets/images/trash-light-green.png"
              alt="delete"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
            />
          </div>
          <Button v-if="edit" @click="addExercise" type="button">Add</Button>
        </div>
      </div>

      <!-- Update Button -->
      <Button v-if="edit" @click="update" type="button" class="mt-10">
        Update Workout
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { supabase } from '../supabase/init';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import store from '../store/index';
import { uid } from 'uid';
import { Workout } from '@/models/Workout';
export default {
  name: 'view-workout',
  setup() {
    // Create data / vars
    const data = ref<Workout>({} as any); //todo 🤮
    const dataLoaded = ref(false);
    const errorMsg = ref<string>();
    const statusMsg = ref<string>();
    const route = useRoute();
    const router = useRouter();
    const user = computed(() => store.state.user);

    // Get current Id of route
    const workoutId = route.params.workoutId;

    // Get workout data
    const getData = async () => {
      try {
        const { data: workout, error } = await supabase
          .from('workouts')
          .select('*')
          .eq('id', workoutId)
          .single();
        if (error) throw error;
        data.value = workout;
        dataLoaded.value = true;
      } catch (e: any) {
        errorMsg.value = e.message;
        setTimeout(() => (errorMsg.value = undefined), 5000);
      }
    };

    getData();

    // Delete workout
    const deleteWorkout = async () => {
      try {
        const { error } = await supabase
          .from('workouts')
          .delete()
          .eq('id', workoutId);
        if (error) throw error;
        router.push({ name: 'Home' });
      } catch (e: any) {
        errorMsg.value = `Error: ${e.message}`;
        setTimeout(() => (errorMsg.value = undefined), 5000);
      }
    };

    // Edit mode
    const edit = ref(false);
    const editMode = () => {
      edit.value = !edit.value;
    };

    // Add exercise
    const addExercise = () => {
      if (data.value?.workoutType === 'strength') {
        data.value.exercises.push({
          id: uid(),
          exercise: '',
          sets: '',
          reps: '',
          weight: '',
        });
        return;
      } else {
        data.value?.exercises.push({
          id: uid(),
          cardioType: undefined,
          distance: '',
          duration: '',
          pace: '',
        });
      }
    };

    // Delete exercise
    const deleteExercise = (id?: string) => {
      if (data.value.exercises.length > 1) {
        data.value.exercises = data.value.exercises.filter((e) => e.id !== id);
      } else {
        errorMsg.value =
          'Error: Cannot remove, need to have at least one exercise';
        setTimeout(() => (errorMsg.value = ''), 5000);
      }
    };

    // Update Workout
    const update = async () => {
      try {
        const { error } = await supabase
          .from('workouts')
          .update({
            workoutName: data.value.workoutName,
            exercises: data.value.exercises,
          })
          .eq('id', workoutId);
        if (error) throw error;
        edit.value = false;
        statusMsg.value = 'Success: Workout Updated!';
        setTimeout(() => (statusMsg.value = undefined), 5000);
      } catch (e: any) {
        errorMsg.value = `Error: ${e.message}`;
        setTimeout(() => (errorMsg.value = undefined), 5000);
      }
    };

    return {
      statusMsg,
      data,
      dataLoaded,
      errorMsg,
      edit,
      editMode,
      user,
      deleteWorkout,
      addExercise,
      deleteExercise,
      update,
    };
  },
};
</script>

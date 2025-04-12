<script setup lang="ts">
const todos = inject("todos");
const { lang, $t } = inject("nls");
</script>
<template>
  <div class="flex items-center justify-center w-full">
    <div
      class="todo-list-content flex items-center border-b border-blue-100/50 w-full"
    >
      <UButton
        class="cursor-pointer w-full rounded-tl rounded-tr rounded-bl-none rounded-br-none"
        size="md"
        color="neutral"
        :variant="todos.inTodo.value ? 'solid' : 'ghost'"
        @click="todos.setTodoPageState('todo')"
      >
        {{ $t("toDo") }}
      </UButton>
      <UButton
        class="cursor-pointer w-full rounded-tl rounded-tr rounded-bl-none rounded-br-none"
        size="md"
        color="neutral"
        :variant="todos.inInProgress.value ? 'solid' : 'ghost'"
        @click="todos.setTodoPageState('inprogress')"
      >
        {{ $t("inProgress") }}
      </UButton>
      <UButton
        class="cursor-pointer w-full rounded-tl rounded-tr rounded-bl-none rounded-br-none"
        size="md"
        color="neutral"
        :variant="todos.inDone.value ? 'solid' : 'ghost'"
        @click="todos.setTodoPageState('done')"
      >
        {{ $t("done") }}
      </UButton>
    </div>
  </div>
</template>

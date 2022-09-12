<template>
  <NavBar />
  <div class="grid flex mt-10 md:mx-28 grid-cols-12">
    <ListPerson />
    <div class="inline border col-span-10">
      <div
        class="col-row-10 overflow-y-auto bg-slate-100 p-3"
        style="height: 41rem"
      >
        <div>
          <div></div>
          <div class="flex border grid grid-cols-12">
            <img
              class="mx-auto"
              width="40"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
            />
            <div class="my-auto border col-span-10">
              <p class="mx-4">sdasasdasd asdasd asdasd as das d as das ddasd</p>
            </div>
            <p class="flex justify-center my-auto">10.00</p>
          </div>
          <div class="flex border grid grid-cols-12 my-2">
            <p class="flex justify-center my-auto">10.00</p>
            <div class="my-auto border col-span-10">
              <p class="flex justify-end">
                sdasasdasd asdasd asdasd as das d as das ddasd
              </p>
            </div>
            <p
              class="mx-auto my-auto bg-slate-800 text-slate-100 px-2 py-1 rounded-full"
            >
              Anda
            </p>
          </div>
        </div>
      </div>
      <div class="bg-slate-100-0 p-1">
        <FieldMessage />
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "../components/NavBar.vue";
import ListPerson from "../components/ListPerson.vue";
import FieldMessage from "../components/FieldMessage.vue";
export default {
  components: { NavBar, ListPerson, FieldMessage },
};
</script>

export default function AvatarDemo() {
  return (
    <div x-data="{src: 'https://static.wikia.nocookie.net/naruto/images/d/d6/Naruto_Part_I.png/revision/latest/scale-to-width-down/300?cb=20210223094656'}">
      <input
        type="text"
        x-model="src"
      />
      <div
        x-avatar="{id: 37}"
        x-avatar:root
        class="h-80px w-80px items-center justify-center rounded-full"
      >
        <span
          x-avatar:fallback
          class="h-80px w-80px rounded-full bg-bluegray text-size-sm text-white font-600 line-height-[1]"
        >
          PA
        </span>
        <img
          alt="PA"
          x-bind:src="src"
          x-avatar:image
          class="object-cover h-80px w-80px rounded-full"
        />
      </div>
    </div>
  );
}

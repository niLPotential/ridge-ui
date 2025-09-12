export default function AvatarDemo() {
  return (
    <div
      x-data="avatar()"
      x-bind="root"
      class="h-80px w-80px items-center justify-center rounded-full"
    >
      <span
        x-bind="fallback"
        class="h-80px w-80px rounded-full bg-bluegray text-size-sm text-white font-600 line-height-[1]"
      >
        PA
      </span>
      <img
        alt="PA"
        x-bind:src="src"
        x-bind="image"
        class="object-cover h-80px w-80px rounded-full"
      />
    </div>
  );
}

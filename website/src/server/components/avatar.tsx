export default function AvatarDemo() {
  return (
    <div x-data="avatar()" x-bind="root">
      <span x-bind="fallback">PA</span>
      <img alt="PA" x-bind:src="src" x-bind="image" />
    </div>
  );
}

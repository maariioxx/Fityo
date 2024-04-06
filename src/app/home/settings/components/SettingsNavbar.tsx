import Link from 'next/link';

export default function SettingsNavbar({
  searchParams,
}: {
  searchParams: { show: 'account' | 'nutrition' };
}) {
  return (
    <div className={`${searchParams.show === 'account' && 'pb-8'}`}>
      <div className="flex justify-evenly gap-4 pb-2">
        <Link
          href={'/home/settings?show=account'}
          className={`text-xl hover:bg-green-700 py-2 px-3 rounded-xl transition-colors ${
            searchParams.show === 'account' && 'bg-green-700'
          }`}
        >
          Account
        </Link>
        <Link
          href={'/home/settings'}
          className={`text-xl hover:bg-green-700 py-2 px-3 rounded-xl transition-colors ${
            searchParams.show !== 'account' && 'bg-green-700'
          }`}
        >
          Nutrition
        </Link>
      </div>
      <hr />
    </div>
  );
}

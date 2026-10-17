// Exact boundary toolchains. Current fixtures remain independently locked projects.
export const angularPeerRange = '>=17.0.0 <23.0.0';
export const compatibilityMatrix = [17, 18, 19, 20, 21, 22].flatMap((angular) => [
	{ angular, profile: 'current' },
	{
		angular,
		profile: 'minimum',
		version: `${angular}.0.0`,
		typescript: {
			17: '5.2.2',
			18: '5.4.5',
			19: '5.5.4',
			20: '5.8.3',
			21: '5.9.3',
			22: '6.0.2',
		}[angular],
		zone: angular <= 18 ? '0.14.10' : '0.15.1',
	},
]);
compatibilityMatrix.push({
	angular: 22,
	profile: '22.1.2',
	version: '22.1.2',
	typescript: '6.0.2',
	zone: '0.15.1',
});

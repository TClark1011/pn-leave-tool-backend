/**
 * THe number of days before leave of the corresponding status should be deleted;
 */
export const leaveDeleteParameters = {
	"denied": 14,
	"allowed": 365,
};

/**
 * The percentage of the workforce that is required for a depot to operate
 */
export const requiredWorkforce = 0.9;

/**
 * The minimum number of days (from the current date) that leave can start
 */
export const leaveStartMinOffset = 14;

/**
 * Minimum/maximum length (in days) of annual leave
 */
export const leaveLength = {
	"min": 1,
	"max": 100,
};

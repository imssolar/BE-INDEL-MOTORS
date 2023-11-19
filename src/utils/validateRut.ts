export const validateRut = (rutToValidate: string): boolean => {
	// eslint-disable-next-line no-useless-escape
	const regexPattern = /\b\d{1,2}\.\d{3}\.\d{3}\-[K|k|0-9]/g
	return regexPattern.test(rutToValidate)
}

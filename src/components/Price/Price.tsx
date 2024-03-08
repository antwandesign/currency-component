export type _BFF = {
	currency: "EUR" | "BGN";
	FORMAT: string;
	toEur: number;
	toBgn: number;
};
type Props = {
	primaryComponent: (price: currencyProp) => JSX.Element;
	secondaryComponent: (price: currencyProp) => JSX.Element;
	price: number;
	_bff: _BFF;
};

type currencyProp = {
	amount: number;
	code: string;
};

export const Price = (props: Props) => {
	const [primaryIdentifier, secondaryIdentifier] = saferSplit("&");

	const bgn =
		props._bff.currency === "BGN"
			? props.price
			: convertCurrency(props.price);
	const eur =
		props._bff.currency === "EUR"
			? props.price
			: convertCurrency(props.price);

	const primaryPrice =
		primaryIdentifier === "BGN"
			? { amount: bgn, code: "BGN" }
			: { amount: eur, code: "EUR" };
	const secondaryPrice =
		secondaryIdentifier === "EUR"
			? { amount: eur, code: "EUR" }
			: { amount: bgn, code: "BGN" };
	/**
	 *
	 * UTILS ... only here for closure
	 *
	 */
	function saferSplit(s: string): [string, string | undefined] {
		const [primary, secondary] = props._bff.FORMAT.split(s);
		return [primary, secondary];
	}

	function convertCurrency(price: number) {
		switch (props._bff.currency) {
			case "BGN":
				return BGNtoEUR(price);
			case "EUR":
				return EURtoBGN(price);
		}
	}

	function BGNtoEUR(bgn: number) {
		return bgn * props._bff.toEur;
	}

	function EURtoBGN(eur: number) {
		return eur * props._bff.toBgn;
	}

	return (
		<>
			{props.primaryComponent(primaryPrice)}
			{secondaryIdentifier && props.secondaryComponent(secondaryPrice)}
		</>
	);
};

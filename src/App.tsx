import { Price, _BFF } from "@/components";
import { useState } from "react";

function App() {
	const [bff, setBff] = useState<_BFF & { amount: number }>({
		currency: "BGN",
		FORMAT: "BGN&EUR",
		toBgn: 1.95,
		toEur: 0.54,
		amount: 5
	});
	return (
		<>
			<div
				className="flex flex-row gap-4 mx-14 mt-4 shadow-md hover:shadow-xl rounded-xl p-4 transition-shadow	transition-property: box-shadow;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
transition-duration: 150ms;"
			>
				<div className="flex flex-col flex-grow w-1/4">
					<p className="text-center text-neutral-600 text-sm mb-2">
						AMOUNT
					</p>
					<select
						className=" p-1 rounded-xl bg-neutral-50 shadow-inner text-center"
						id="currency"
						value={bff.currency}
						onChange={(event) =>
							setBff((prev) => ({
								...prev,
								currency: event.target.value as _BFF["currency"]
							}))
						}
					>
						<option>BGN</option>
						<option>EUR</option>
					</select>
				</div>
				<div className="flex flex-col flex-grow w-1/4">
					<p className="text-center text-neutral-600 text-sm mb-2">
						FORMAT
					</p>
					<select
						className="p-1 rounded-xl bg-neutral-50 shadow-inner text-center"
						id="format"
						value={bff.FORMAT}
						onChange={(event) =>
							setBff((prev) => ({
								...prev,
								FORMAT: event.target.value as _BFF["currency"]
							}))
						}
					>
						<option>BGN</option>
						<option>BGN&EUR</option>
						<option>EUR&BGN</option>
						<option>EUR</option>
					</select>
				</div>
				<div className="flex flex-col flex-grow w-1/4">
					<p className="text-center text-neutral-600 text-sm mb-2">
						AMOUNT
					</p>
					<input
						type="number"
						min={0}
						className="p-1 rounded-xl bg-neutral-50 shadow-inner text-center focus-visible:outline-0"
						id="amount"
						value={bff.amount}
						onChange={(event) => {
							setBff((prev) => ({
								...prev,
								amount: parseFloat(event.target.value)
							}));
						}}
					/>
				</div>

				<div className="flex flex-col flex-grow w-1/4">
					<p className="text-center text-neutral-600 text-sm mb-2">
						BGN TO EUR
					</p>
					<input
						type="number"
						min={0}
						required
						className="p-1 rounded-xl bg-neutral-50 shadow-inner text-center focus-visible:outline-0"
						id="toBgn"
						value={bff.toBgn}
						onChange={(event) => {
							setBff((prev) => ({
								...prev,
								toBgn: parseFloat(event.target.value)
							}));
						}}
					/>
				</div>

				<div className="flex flex-col flex-grow w-1/4">
					<p className="text-center text-neutral-600 text-sm mb-2">
						EUR TO BGN
					</p>
					<input
						type="number"
						className="p-1 rounded-xl bg-neutral-50 shadow-inner text-center focus-visible:outline-0"
						id="toEur"
						value={bff.toEur}
						onChange={(event) => {
							setBff((prev) => ({
								...prev,
								toEur: parseFloat(event.target.value)
							}));
						}}
					/>
				</div>
			</div>
			<div className="min-h-64 flex justify-center items-center">
				<div className="flex flex-wrap items-baseline gap-8">
					{/**
					 *
					 *
					 *
					 */}
					<Price
						price={bff.amount}
						primaryComponent={(price) => {
							const { amount, code } = price;
							return (
								<span className="flex items-baseline font-bold text-neutral-900">
									<h2 className="text-9xl align-text-bottom">
										{amount.toFixed(2)}
									</h2>
									<h2 className="text-7xl align-text-bottom">
										{code}
									</h2>
								</span>
							);
						}}
						secondaryComponent={(price) =>
							SecondaryComponent(price)
						}
						_bff={bff} //ignore
					/>
					{/**
					 *
					 *
					 *
					 */}
				</div>
			</div>
		</>
	);
}

export default App;

function SecondaryComponent(price: { amount: number; code: string }) {
	const { amount, code } = price;
	const [value, denomination] = amount.toFixed(2).split(".");
	return (
		<span className="flex items-baseline text-neutral-700">
			<h3 className="text-8xl align-text-bottom font-regular">{value}</h3>
			<h3 className="text-3xl align-text-bottom font-light">
				.{denomination}
			</h3>

			<h3 className="text-5xl align-text-bottom">{code}</h3>
		</span>
	);
}

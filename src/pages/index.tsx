import {GetStaticProps} from "next";
import Head from "next/head";

import {SubscribeButton} from "../components/SubscribeButton";
import {stripe} from "../services/stripe";

import styles from "./home.module.scss";

type HomeProps = {
	product: {
		priceId: string;
		amount: number;
	};
};

export default function Home({product}: HomeProps) {
	return (
		<>
			<Head>
				<title>Home | gab of blog</title>
			</Head>

			<main className={styles.contentContainer}>
				<section className={styles.hero}>
					<span>🤘🏻 Hey, welcome</span>
					<h1>
						News About the <span>React</span> world.
					</h1>
					<p>
						Get to acess to all the publications <br />
						<span>for {product.amount} month </span>
					</p>
					<SubscribeButton priceId={product.priceId} />
				</section>

				<img src="/images/avatar.svg" alt="Girl Coding" />
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const price = await stripe.prices.retrieve(
		"price_1LOccEGhqXhWDL3kFV2UhawD"
	);

	const product = {
		priceId: price.id,
		amount: new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(price.unit_amount / 100),
	};

	return {
		props: {
			product,
		},
	};
};

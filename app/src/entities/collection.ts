export interface CollectionProps {
	name: string;
	contract: string;
	description: string;
	floorSale: JSON;
	floorSaleChange: JSON;
	createdAt?: Date;
}

export class Collection {
	private id: string;
	private props: CollectionProps;

	constructor(props: CollectionProps) {
		this.id = props.contract;
		this.props = {
			...props,
			createdAt: props.createdAt ?? new Date(),
		};
	}

	public get getID(): string {
		return this.id;
	}

	public set contract(contract: string) {
		this.props.contract = contract;
	}

	public get contract(): string {
		return this.props.contract;
	}

	public set description(description: string) {
		this.props.description = description;
	}

	public get description(): string {
		return this.props.description;
	}

	public set floorSale(floorSale: JSON) {
		this.props.floorSale = floorSale;
	}

	public get floorSale() {
		return this.props.floorSale;
	}

	public set floorSaleChange(floorSaleChange: JSON) {
		this.props.floorSaleChange = floorSaleChange;
	}

	public get floorSaleChange() {
		return this.props.floorSaleChange;
	}

	public set name(name: string) {
		this.props.name = name;
	}

	public get name(): string {
		return this.props.name;
	}
}

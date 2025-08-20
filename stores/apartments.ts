import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export type Apartment = {
	id: number;
	area: number;
	price: number;
	floor: number;
	total_floors: number;
	rooms: number;
	number: number;
	plan_url: string;
};

type ApartmentFilters = {
	rooms?: number[];
	price?: [number, number];
	area?: [number, number];
};

type Sort = 'desc' | 'asc';
export type SortField = 'area' | 'floor' | 'price';

type ApartmentSort = {
	field: SortField;
	direction: Sort;
};

function applyFilters(
	filters: ApartmentFilters,
	apts: Apartment[]
): Apartment[] {
	return apts.filter((a) => {
		if (filters.area && filters.area.length === 2) {
			if (!(a.area >= filters.area[0] && a.area <= filters.area[1]))
				return false;
		}

		if (filters.price && filters.price.length === 2) {
			if (!(a.price >= filters.price[0] && a.price <= filters.price[1]))
				return false;
		}

		if (filters.rooms?.length) {
			if (!filters.rooms.includes(a.rooms)) return false;
		}

		return true;
	});
}

function applySort(sort: ApartmentSort, apts: Apartment[]) {
	return [...apts].sort((a, b) => {
		if (sort.direction === 'desc') {
			return b[sort.field] - a[sort.field];
		} else {
			return a[sort.field] - b[sort.field];
		}
	});
}

export const FILTER_DEFAULTS: ApartmentFilters = {
	rooms: [2],
	price: [5_500_000, 18_900_000],
	area: [33, 123],
};

export const SORT_DEFAULTS: ApartmentSort = {
	direction: 'asc',
	field: 'price',
};

export const useApartmentsStore = defineStore('apartmentsStore', {
	state: () => ({
		loading: false,
		error: undefined,
		count: 0,
		items: [] as Apartment[],
		filters: useLocalStorage<ApartmentFilters>(
			'apartment_filters',
			{} as ApartmentFilters
		),
		sort: useLocalStorage<ApartmentSort>('apartment_sort', {} as ApartmentSort),
	}),
	hydrate(state) {
		// @ts-expect-error
		state.filters = useLocalStorage<ApartmentFilters>(
			'apartment_filters',
			JSON.parse(JSON.stringify(FILTER_DEFAULTS))
		);

		// @ts-expect-error
		state.sort = useLocalStorage<ApartmentSort>(
			'apartment_sort',
			JSON.parse(JSON.stringify(SORT_DEFAULTS))
		);
	},
	actions: {
		async fetchApartments(filters: ApartmentFilters) {
			this.loading = true;
			try {
				const response = await $fetch<{ data: Apartment[]; count: number }>(
					'/json/placeholder_apartments.json'
				);

				const items = applySort(
					this.sort,
					applyFilters(filters, response.data)
				);
				return {
					items,
					count: items.length,
				};
			} catch (error: any) {
				this.error = error.message || 'Unknown error';
			} finally {
				this.loading = false;
			}
		},

		async appendApartments(page: number = 1, limit: number = 5) {
			const data = await this.fetchApartments(this.filters);

			if (!data) return;

			const newItems = data.items.slice(page * limit - limit, page * limit);
			this.count = data.count;
			this.items = [...this.items, ...newItems];
		},
	},
});

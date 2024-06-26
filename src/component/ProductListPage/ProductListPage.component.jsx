import ProductCard from '@scandipwa/scandipwa/src/component/ProductCard';
import { CategoryPageLayout } from '@scandipwa/scandipwa/src/route/CategoryPage/CategoryPage.config';
import { PRODUCTS_PRELOAD_COUNT } from '@scandipwa/scandipwa/src/util/Product';
import { setLoadedFlag } from '@scandipwa/scandipwa/src/util/Request/LowPriorityLoad';
import { AfterPriority } from '@scandipwa/scandipwa/src/util/Request/LowPriorityRender';

import {
    ProductListPageComponent as SourceProductListPageComponent,
} from 'SourceComponent/ProductListPage/ProductListPage.component';

/** @namespace myStore/Component/ProductListPage/Component */
export class ProductListPageComponent extends SourceProductListPageComponent {
    renderPageItems() {
        const {
            items,
            selectedFilters,
            mix: {
                mods: {
                    layout = CategoryPageLayout.GRID,
                } = {},
            },
        } = this.props;

        const sortedItems = Array.from(items).sort((a, b) => b.in_stock - a.in_stock);

        return sortedItems.map((product, index) => {
            if (index < PRODUCTS_PRELOAD_COUNT) {
                return (
                    <ProductCard
                      product={ product }
                      // eslint-disable-next-line react/no-array-index-key
                      key={ index }
                      selectedFilters={ selectedFilters }
                      layout={ layout }
                      { ...this.containerProps() }
                      onLoad={ setLoadedFlag }
                    />
                );
            }

            return (
                <AfterPriority fallback={ <div style={ { minHeight: 200 } } /> }>
                    <ProductCard
                      product={ product }
                      // eslint-disable-next-line react/no-array-index-key
                      key={ index }
                      selectedFilters={ selectedFilters }
                      layout={ layout }
                      onLoad={ setLoadedFlag }
                    />
                </AfterPriority>
            );
        });
    }
}

export default ProductListPageComponent;

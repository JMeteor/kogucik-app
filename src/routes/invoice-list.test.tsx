import { describe, test, expect } from 'vitest';
import {render} from "../test/test-utils.tsx";
import {InvoiceList} from "./invoice-list.tsx";
import {screen} from "@testing-library/react";
import {mockInvoice} from "../mocks/invoice.mock.ts";
import {Route, Routes} from "react-router-dom";

describe('InvoiceList', () => {
    test('should display list', async () => {
        render(<Routes>
            <Route path='/' element={<InvoiceList />} />
        </Routes>);

       expect(await screen.findByText(mockInvoice.name)).toBeInTheDocument()
    });
})

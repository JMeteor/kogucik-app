import { describe, it, expect, vi } from "vitest";
import {render} from "@testing-library/react";
import {InvoiceForm} from "./InvoiceForm.tsx";

describe('InvoiceForm', () => {
  it('renders without crashing', () => {
    render(<InvoiceForm mode="view" onSubmit={vi.fn()} resolver={vi.fn()} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
  });
})

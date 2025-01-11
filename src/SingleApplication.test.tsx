import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SingleApplication from "./SingleApplication";

const mockApplication = {
  company: "Test Company",
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  loan_amount: 85268,
  date_created: "1994-04-12T00:00:00Z",
  expiry_date: "2024-12-12T00:00:00Z",
};

describe("SingleApplication", () => {
  it("should render the SingleApplication component", () => {
    render(<SingleApplication application={mockApplication} />);
    expect(screen.getByText("Test Company")).toBeInTheDocument();
  });

  it("should render the email as a clickable link", () => {
    render(<SingleApplication application={mockApplication} />);
    const emailLink = screen.getByText("john.doe@example.com");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:john.doe@example.com");
  });

  it("should format the loan amount correctly with commas and currency symbol", () => {
    render(<SingleApplication application={mockApplication} />);
    const loanAmount = screen.getByText("£85,268");
    expect(loanAmount).toBeInTheDocument();
  });

  it("should format the dates correctly", () => {
    render(<SingleApplication application={mockApplication} />);
    const applicationDate = screen.getByText("12-04-1994");
    const expiryDate = screen.getByText("12-12-2024");
    expect(applicationDate).toBeInTheDocument();
    expect(expiryDate).toBeInTheDocument();
  });
});

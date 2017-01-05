defmodule Pomerol.QuoteContact do
  use Pomerol.Web, :model

  schema "quote_contacts" do

    belongs_to :quote, Pomerol.Quote
    belongs_to :contact, Pomerol.Contact

    timestamps
  end
end

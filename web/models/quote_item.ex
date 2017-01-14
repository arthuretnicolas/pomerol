defmodule Pomerol.QuoteItem do
  use Pomerol.Web, :model

  schema "quote_items" do
    field :position, :integer

    belongs_to :quote, Pomerol.Quote
    belongs_to :organization_item, Pomerol.OrganizationItem

    timestamps
  end
end

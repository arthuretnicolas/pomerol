defmodule Pomerol.Quote do
  use Pomerol.Web, :model

  schema "quotes" do

    field :title, :string
    belongs_to :organization, Pomerol.Organization

    has_many :quote_contacts, Pomerol.QuoteContact
    has_many :contacts, through: [:quote_contacts, :contact]

    timestamps
  end

  def create_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :organization_id])
    |> validate_required([:title, :organization_id])
  end
end

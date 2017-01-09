defmodule Pomerol.Quote do
  use Pomerol.Web, :model

  schema "quotes" do

    field :title, :string
    field :currency, :string
    field :global_discount_percent, :decimal, default: 0
    field :expiry_date_time, Timex.Ecto.DateTime
    field :amounts_entered, :string
    field :show_item_code, :boolean, default: true
    field :show_item_total, :boolean, default: true
    field :show_unit_price_and_quantity, :boolean, default: true

    belongs_to :sender, Pomerol.User
    belongs_to :organization, Pomerol.Organization

    has_many :quote_contacts, Pomerol.QuoteContact
    has_many :contacts, through: [:quote_contacts, :contact]

    timestamps
  end

  def create_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :organization_id, :sender_id, :currency, :global_discount_percent, :expiry_date_time, :amounts_entered, :show_item_code, :show_item_total, :show_unit_price_and_quantity])
    |> validate_required([:title, :organization_id, :sender_id, :currency, :global_discount_percent, :expiry_date_time, :amounts_entered, :show_item_code, :show_item_total, :show_unit_price_and_quantity])
    |> validate_inclusion(:amounts_entered, amounts_entered_options)
  end

  defp amounts_entered_options do
    ~w{ exclusive_excluding exclusive_including inclusive no_tax }
  end

end

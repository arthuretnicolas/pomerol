defmodule Pomerol.ContactField do
  use Pomerol.Web, :model

  schema "contact_fields" do
    field :type, :string
    field :value, :string

    belongs_to :contact, Pomerol.Contact

    timestamps
  end

  def changeset(contact, params \\ %{}) do
    contact
    |> cast(params, [:type, :value, :contact_id])
    |> validate_required([:type, :value])
    |> validate_inclusion(:type, field_types)
  end

  defp field_types do
    ~w{ primary_phone work_phone mobile_phone home_phone website twitter skype fax }
  end

end
